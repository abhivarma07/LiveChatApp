import bcrypt from "bcrypt";
import sha256 from "sha256";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const encryptSecurityPin = async (pin) => {
  const hashedPin = await bcrypt.hash(pin, saltRounds);
  return hashedPin;
};

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const encryptMFSSign = async (sign: string) => {
  return sha256(sign);
};

const encryptMFSAuthorization = async (
  partnerCode: string,
  password: string,
  timestamp: string
) => {
  let _value = `${partnerCode}${password}${timestamp}`;
  const hashedValue = sha256(_value);
  return hashedValue;
};

const decryptPassword = async (plainPassword: string, hashPassword: string) => {
  const result = await bcrypt.compare(plainPassword, hashPassword);
  return result;
};

const isSecurityPinValid = async (pin, hashedPin) => {
  const compare = await bcrypt.compare(pin, hashedPin);
  return compare;
};

export {
  encryptSecurityPin,
  encryptPassword,
  isSecurityPinValid,
  decryptPassword,
  encryptMFSSign,
  encryptMFSAuthorization,
};
