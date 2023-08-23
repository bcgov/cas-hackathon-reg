""" Module for getting database dump.
"""
import subprocess
import io
from typing import List


class CopyException(Exception):
    """ Custom exception for errors """


def oc_n_project(project: str) -> List:
    """ Construct['oc', '-n', '<project name>'] """
    return ['oc', '-n', project]


def oc_rsh(project: str, pod: str) -> List:
    """ Construct['oc', '-n', '<project_name>', 'rsh', '<pod>'] """
    return [*oc_n_project(project), 'rsh', pod]


def get_first_project() -> str:
    """ Return the first project in the list """
    result = subprocess.run(['oc', 'get', 'projects', '-o', 'name'],
                            stdout=subprocess.PIPE, check=True, text=True)
    project = io.StringIO(result.stdout).readline()
    return project[project.rindex('/') + 1:-1]


def list_pods(project: str) -> None:
    """ print list of pods to screen """
    result = subprocess.run([*oc_n_project(project), 'get', 'pods'],
                            stdout=subprocess.PIPE, check=True, text=True)
    print(result.stdout)


def list_projects() -> None:
    """ Print list of projects to screen """
    result = subprocess.run(['oc', 'get', 'projects'], stdout=subprocess.PIPE, check=True, text=True)
    print(result.stdout)


def list_cluster_members(project: str, pod: str) -> None:
    """ List cluster members available """
    print("fetching cluster members...")
    result = subprocess.run([*oc_rsh(project, pod), 'patronictl', 'list'],
                            stdout=subprocess.PIPE, check=True, text=True)
    lines = io.StringIO(result.stdout)
    pod_is_leader = False
    for line in lines:
        print(line[:-1])
        if pod in line and 'Leader' in line:
            pod_is_leader = True
        if pod in line and 'Replica' in line:
            print('The pod you selected is a Replica. This is good.')
    if pod_is_leader:
        message = 'Please don\'t use the Leader - choose a different pod.'
        print(message)
        raise CopyException(message)


def list_databases(project: str, pod: str) -> None:
    """ List databases on pod """
    print("fetching list of databases...")
    result = subprocess.run([*oc_rsh(project, pod), 'psql'], input='\\l',
                            stdout=subprocess.PIPE, check=True, text=True, timeout=20)
    print(result.stdout)


def list_schemas(project: str, pod: str, database: str) -> None:
    """ List schemas within database """
    print("fetching list of schemas...")
    result = subprocess.run([*oc_rsh(project, pod), 'psql', '-d', database], input='\\dn', stdout=subprocess.PIPE, check=True, text=True, timeout=20)
    print(result.stdout)


def create_lock_file(project: str, pod: str, database: str) -> None:
    """ Attempt to create a lock file, will fail if already exists """
    try:
        lock_file = '/tmp/{}.lock'.format(database)
        print('creating lock file: {}'.format(lock_file))
        subprocess.run([*oc_rsh(project, pod), 'mkdir', lock_file],
                       stdout=subprocess.PIPE, check=True, text=True)
    except subprocess.CalledProcessError:
        print('failed to create lock {}:{} - another copy may be in progress'.format(pod, lock_file))
        raise


def delete_lock_file(project: str, pod: str, database: str) -> None:
    """ Attempt to delete lockfile """
    lock_file = '/tmp/{}.lock'.format(database)
    print('deleting lock {}:{}...'.format(pod, lock_file))
    result = subprocess.run([*oc_rsh(project, pod), 'rmdir', lock_file],
                            stdout=subprocess.PIPE, check=True, text=True)
    print(result.stdout)


def dump_database(project: str, pod: str, database: str, schema: str) -> List[str]:
    """ Dump database to file """
    print('running pg_dump...')
    files = ['/tmp/dump_db.tar', ]

    print('(complete dump)')
    result = subprocess.run([*oc_rsh(project, pod), 'pg_dump', '-n', schema, '--file=/tmp/dump_db.tar',
                                 '--clean', '-Ft', database],
                                stdout=subprocess.PIPE, check=True, text=True)
    print(result.stdout)

    process = subprocess.Popen([*oc_rsh(project, pod)], stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    for filename in files:
        print('zip: {}'.format(filename))
        process.stdin.write('gzip {}\n'.format(filename))
        process.stdin.flush()

    print('waiting for process to complete...')
    out, errs = process.communicate()
    print(out)
    print(errs)
    return files


def copy_files_to_local(project: str, pod: str, files: List[str]) -> None:
    """ Copy compressed files to local """
    for filename in files:
        print('copying {}.gz...'.format(filename))
        result = subprocess.run([*oc_n_project(project), 'cp', '{}:{}.gz'.format(pod, filename),
                                 './{}.gz'.format(filename)],
                                stdout=subprocess.PIPE, check=True, text=True)
        print(result.stdout)


def delete_remote_files(project: str, pod: str, files: List[str]) -> None:
    """ Delete all the files we made from the server(cleanup) """
    process = subprocess.Popen([*oc_rsh(project, pod)], stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    for filename in files:
        print('deleting {}:{}.gz'.format(pod, filename))
        process.stdin.write('rm {}.gz\n'.format(filename))
        process.stdin.flush()

    print('waiting for process to complete...')
    out, errs = process.communicate()
    print(out)
    print(errs)


def unzip_locally(files: List[str]) -> None:
    """ Unzip all the files locally """
    print('unzipping files locally...')
    for filename in files:
        print('unzip .{}.gz'.format(filename))
        result = subprocess.run(['gunzip', '.{}.gz'.format(filename)],
                                stdout=subprocess.PIPE, check=True, text=True)
        print(result.stdout)


def get_project() -> str:
    """ Get project user is going to use """
    list_projects()
    project = input("enter project name: ")
    if not project:
        project = get_first_project()
        print(project)
    return project


def get_pod(project) -> str:
    """ Get name of the pod """
    list_pods(project)
    pod = input("enter pod name: ")
    if not pod:
        raise CopyException("you have to specify a pod name!")
    list_cluster_members(project, pod)
    return pod


def get_database(project, pod) -> str:
    """ Get the name of the database """
    list_databases(project, pod)
    database = input("enter name of database: ")
    if not database:
        raise CopyException("you have to specify a database!")
    return database

def get_schema(project, pod, database) -> str:
    """ Get the name of the schema """
    list_schemas(project, pod, database)
    schema = input("enter name of schema: ")
    if not schema:
        raise CopyException("you must specify the schema!")
    return schema


def main():
    """
    Entry points - assumes you have openshift command line tools installed and are logged in .
    """
    project = get_project()
    pod = get_pod(project)
    database = get_database(project, pod)
    schema = get_schema(project, pod, database)
    print('schema: {}'.format(schema))
    create_lock_file(project, pod, database)
    try:
        files = dump_database(project, pod, database, schema)
        copy_files_to_local(project, pod, files)
        delete_remote_files(project, pod, files)
    finally:
        delete_lock_file(project, pod, database)
    unzip_locally(files)


if __name__ == '__main__':
    main()