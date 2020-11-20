type OptionsObject = {
  label: string,
  regex?: any,
  valid?: boolean
}

const useFieldValueValidator = (value: string, options: Array<OptionsObject> = []) => {
  let list = options, valid = true;

  if(list && list.length > 0) {
    list = list.map((item) => {
      const { regex } = item;
      item["valid"] =  true;
      if(regex) {
        const validateRegex = new RegExp(regex);
        item["valid"] = validateRegex.test(value);
      }
      valid = list.every((item)=>item.valid);
      return item;
    })
  }
  return {list, valid};
};

export default useFieldValueValidator;
