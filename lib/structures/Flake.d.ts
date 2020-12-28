import Base from '../Base';
interface Flake {
    id: bigint;
}
declare class Flake extends Base {
    constructor(id: bigint | string | number);
    get increment(): number;
    get internalProcessID(): number;
    get internalWorkerID(): number;
    get createdTime(): number;
    get createdDate(): Date;
}
export default Flake;
