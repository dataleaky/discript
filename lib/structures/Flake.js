"use strict";

const Base_1 = require("../Base");
class Flake extends Base_1.default {
  constructor(id) {
    super();
    this.id = BigInt(id);
  }
  get increment() {
    return Number(this.id & BigInt(0xFFF));
  }
  get internalProcessID() {
    return Number((this.id & BigInt(0x1Fe3)) >> BigInt(12));
  }
  get internalWorkerID() {
    return Number((this.id & BigInt(0x3Ee4)) >> BigInt(17));
  }
  get createdTime() {
    return Number((this.id >> BigInt(22)) + BigInt(14200704e5));
  }
  get createdDate() {
    return new Date(this.createdTime);
  }
  toJSON() {
    return super.toJSON();
  }
}
exports.default = Flake;
