interface ClassNameObject {
  [key: string]: ClassNameObject | boolean | string[];
}

const ClassNameArrayAddPrefix = (
  classList: string[],
  prefix: string,
): string[] => {
  return classList.map((item) => prefix + item);
};

const ClassNameObjectToList = (
  classNameObject: ClassNameObject,
  prefix: string,
): string[] => {
  let classNameList: string[] = [];

  for (const [key, value] of Object.entries(classNameObject)) {
    if (typeof value === 'boolean') {
      if (value) {
        classNameList.push(key);
      }
    } else if (value instanceof Array) {
      classNameList = classNameList.concat(ClassNameArrayAddPrefix(value, key));
    } else if (value instanceof Object) {
      classNameList = classNameList.concat(
        ClassNameObjectToList(value as ClassNameObject, key),
      );
    }
  }

  return ClassNameArrayAddPrefix(classNameList, prefix);
};

const ClassName = (
  classinfo: string[] | ClassNameObject,
  prefix?: string,
): string => {
  let finalClassNames: string[] = [];

  if (classinfo instanceof Array) {
    finalClassNames = finalClassNames.concat(
      ClassNameArrayAddPrefix(classinfo, prefix || ''),
    );
  } else if (classinfo instanceof Object) {
    finalClassNames = finalClassNames.concat(
      ClassNameObjectToList(classinfo, prefix || ''),
    );
  }

  return finalClassNames.join(' ');
};

const ClassNameWithCSSModule = (
  CssModule: any,
  classinfo: string[] | ClassNameObject,
  prefix?: string,
): string => {
  let finalClassNames: string[] = [];

  if (classinfo instanceof Array) {
    finalClassNames = finalClassNames.concat(
      ClassNameArrayAddPrefix(classinfo, prefix || ''),
    );
  } else if (classinfo instanceof Object) {
    finalClassNames = finalClassNames.concat(
      ClassNameObjectToList(classinfo, prefix || ''),
    );
  }

  return finalClassNames.map((item) => CssModule[item]).join(' ');
};

const ClassNameFactory = (prefix?: string) => {
  return (classinfo: string[] | ClassNameObject) =>
    ClassName(classinfo, prefix);
};

const ClassNameWithCSSModuleFactory = (cssModule:any, prefix?: string) => {
  return (classinfo: string[] | ClassNameObject) =>
    ClassNameWithCSSModule(cssModule, classinfo, prefix);
};

export { ClassName, ClassNameWithCSSModule };
export { ClassNameFactory, ClassNameWithCSSModuleFactory };
