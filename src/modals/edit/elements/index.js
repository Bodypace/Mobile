import { Field } from "./field";
import { Fields } from "./fields";
import { Legend } from "./legend";
import { Separator } from "./separator";
import { Title } from "./title";

export default function Elements({ layout, item, edit, setEdit }) {
  const elements = {
    title: Title,
    separator: Separator,
    legend: Legend,
    field: Field,
    fields: Fields,
  };

  return layout.map((element, index) => {
    const type = Array.isArray(element) ? "fields" : element.type;
    const Element = elements[type];
    return Element === undefined ? (
      <></>
    ) : (
      <Element
        key={index}
        element={element}
        item={item}
        edit={edit}
        setEdit={setEdit}
      />
    );
  });
}
