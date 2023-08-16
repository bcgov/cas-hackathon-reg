'use client'

import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';

const schema: RJSFSchema = {
  title: 'Organization Access Request',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Operator Id', },
    userId: { type: 'string', title: 'User Id', },
  },
};

const log = (type) => console.log.bind(console, type);
//  we will populate the form ourselves because we already know operator id and user id from fixtures. Basically, the user is just clicking a button to request
export default function accessRequest() {
    return (<><h1></h1>  <Form
    schema={schema}
    validator={validator}
    onChange={log('changed')}
    onSubmit={log('submitted')}
    onError={log('errors')}
  /></>)
 }