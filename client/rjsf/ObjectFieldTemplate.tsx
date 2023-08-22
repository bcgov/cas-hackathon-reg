import { ObjectFieldTemplateProps } from "@rjsf/utils";
export default function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  return (
    <div style={{ fontWeight: "bold" }}>
      {props.title}
      {props.description}
      {props.properties.map((element) => (
        <div style={{ marginBottom: 20 }}>{element.content}</div>
      ))}
    </div>
  );
}
