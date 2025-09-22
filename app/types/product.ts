export type Manufacturer = {
  name: string;
  id: string;
};

export type PhoneModel = {
  name: string;
  id: string;
};

export type PhoneModelGroup = {
  manufacturer: Manufacturer;
  models: PhoneModel[];
};
