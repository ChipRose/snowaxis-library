import React from "react";
import _ from "lodash";

/**
 * returns array from all deep found {obj} props with given {keyToFind}
 * @param obj //object to extract props from
 * @param keyToFind //props key to deep look for
 * @returns {[string, unknown]|*[]} //array of object props
 */
export function findAllByKey (obj, keyToFind) {
  return obj
    ? Object.entries(obj).reduce(
      (acc, [key, value]) =>
        key === keyToFind
          ? acc.concat(value)
          : typeof value === "object"
            ? acc.concat(findAllByKey(value, keyToFind))
            : acc,
      []
    )
    : [];
}

/**
 *
 * @param pairsArray - array of [key, value] pairs
 * @returns {any[]} - array of keys which has duplication in income pairs
 */
export const findDuplicationKeysInPairs = (pairsArray) => {
  const keysArray = pairsArray.map(([key]) => key);
  const duplicated = [
    //
    ...new Set(
      keysArray.filter((key) => keysArray.filter((el) => el === key).length > 1)
    )
  ];
  return duplicated;
};

export const replaceArrayItem = (array, index, ...items) => [
  ...array.slice(0, index),
  ...items,
  ...array.slice(index + 1)
];

export const removeArrayItem = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
];
export const pairsToObj = (arr) => {
  return arr.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

export const isEqualEntities = (first, second) =>
  JSON.stringify(first) === JSON.stringify(second);

// return collection with or without togglinglElement
// It looks for togglingElement in collection and adds it if not found,
// otherwise - removes it
export const toggleElementInCollection = (
  collection,
  togglingElement,
  key = ""
) => {
  const toggledIndex = collection.findIndex((item) =>
    key
      ? item[key] === togglingElement[key]
      : isEqualEntities(item, togglingElement)
  );
  return toggledIndex === -1
    ? [...collection, togglingElement]
    : collection.filter((item) => !isEqualEntities(item, togglingElement));
};
//return collection with addedElement. If element exists - no changes
export const addElementInCollection = (collection, addedElement, key = "") => {
  const toggledIndex = collection.findIndex((item) =>
    key ? item[key] === addedElement[key] : isEqualEntities(item, addedElement)
  );
  return toggledIndex === -1 ? [...collection, addedElement] : collection;
};

//return collection without removedElement. If element doesn't exists - no
// changes
export const removeElementInCollection = (
  collection,
  removedElement,
  key = ""
) => {
  return collection.filter((item) =>
    key
      ? item[key] !== removedElement[key]
      : !isEqualEntities(item, removedElement)
  );
};
// return collection with replaced element, found by key. If no matches - add
// element.
export const setElementInCollectionByKey = (collection, element, key) => {
  if (!collection) return [element];
  if (!element) return collection;
  const elementIndex = collection.findIndex((item) =>
    key
      ? isEqualEntities(item[key], element[key])
      : isEqualEntities(item, element)
  );
  console.log("collection", collection, element, elementIndex);

  const newCollection =
    elementIndex !== -1
      ? collection.map((item, idx) => (idx === elementIndex ? element : item))
      : [...collection, element];
  console.log("setElementInCollectionByKey", newCollection);
  return newCollection;
};

export const camelCaseToUnderscores = (s) => {
  return s
    .replace(/\.?([A-Z]+)/g, function(x, y) {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
};

export const arrayFromString = (string) => {
  if (typeof string !== "string")
    throw Error("arrayFromString. Param is not string.");
  return string
    .split(" ")
    .map((stroka) => stroka.split(","))
    .flat(2)
    .filter((id) => id);
};

export const getObjValueByPath = (path, obj) =>
  path.split(".").reduce((acc, c) => acc && acc[c], obj);

const fieldTypeSignature = ({ id, label, type }) =>
  typeof id === "string" &&
  typeof label === "string" &&
  typeof type === "string";

const getObjectFieldsPaths = (
  obj,
  goodKey = "",
  hasFieldTypeSignature = fieldTypeSignature
) => {
  const entries = Object.entries(obj)
    .filter(([, value]) => typeof value === "object")
    .map(([key, value]) => {
      const isFieldKey = hasFieldTypeSignature(value);
      const keyPath = `${goodKey}${goodKey && "."}${key}`;
      return isFieldKey ? keyPath : getObjectFieldsPaths(value, keyPath);
    });
  // console.log('Object Paths', entries)
  return entries;
};

export const getFieldsPathArray = (obj) => getObjectFieldsPaths(obj).flat(5);

export const pathifyObjectFields = (obj) => {
  const pathsArray = getFieldsPathArray(obj);
  const pathifiedObj = pathsArray.reduce(
    (acc, path) => ({
      ...acc,
      [path]: getObjValueByPath(path, obj)
    }),
    {}
  );
  return pathifiedObj;
};

const getObjectValuesPaths = (obj, goodKey = "") => {
  const simpleEntries = Object.entries(obj)
    .filter(([, value]) => value && typeof value !== "object")
    .map(([key, value]) => {
      const keyPath = `${goodKey}${goodKey && "."}${key}`;
      return keyPath;
    });
  const entries = Object.entries(obj)
    .filter(([, value]) => typeof value === "object")
    .map(([key, value]) => {
      const isFieldKey = typeof value !== "object";
      const keyPath = `${goodKey}${goodKey && "."}${key}`;
      return isFieldKey ? keyPath : getObjectValuesPaths(value, keyPath);
    });
  console.log("pathifiedMap Object Paths", entries);
  return [...simpleEntries, ...entries];
};

export const pathifyObjectValues = (obj) => {
  const pathsArray = getObjectValuesPaths(obj).flat(5);
  console.log("pathifiedMap Object pathsArray", pathsArray);

  const pathifiedObj = pathsArray.reduce(
    (acc, path) => ({
      ...acc,
      [path]: getObjValueByPath(path, obj)
    }),
    {}
  );
  return pathifiedObj;
};
export const removeEmptyProps = (obj, skipZero = false) => {
  return Object.keys(obj).reduce((acc, keyStr) => {
    return Object.hasOwn(obj, keyStr) && (obj[keyStr] || skipZero && obj[keyStr] === 0)
      ? { ...acc, [keyStr]: obj[keyStr] }
      : acc;
  }, {});
};
export const removeUndefinedProps = (obj) => {
  return Object.keys(obj).reduce((acc, keyStr) => {
    return Object.hasOwn(obj, keyStr) && typeof obj[keyStr] !== "undefined"
      ? { ...acc, [keyStr]: obj[keyStr] }
      : acc;
  }, {});
};
export const prettifyJsonOutput = (value, braces = false) => (
  <pre>
    {((v) => {
      return braces ? v : v.replace(/[{}]/g, "");
    })(JSON.stringify(value, undefined, 2))}
  </pre>
);

export function isJSON (str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

const f = (a, b) => [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
export const cartesianProduction = (a, b, ...c) =>
  b ? cartesianProduction(f(a, b), ...c) : a;
