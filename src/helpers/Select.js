import  { useContext } from "react";
import { CatContext } from "./CatContext";

const Select = () => {
  const { selectedKey } = useContext(CatContext);
  const [selected, setSelected] = selectedKey;

  const handleSelectedClick = (cat) => {
    setSelected(cat);
    console.log(selected);
  };

  return { handleSelectedClick };
};

export default Select;
