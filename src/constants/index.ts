import Utils from '../utils';
import { Option } from '../types';

const DEFAULT_SPEED = "1";

const HOST_NAME = "www.hotstar.com";

const OPTIONS: Array<Option> = [
    {
        id: Utils.getOptionId(1),
        value: "1",
        text: 'Normal'
    },
    {
        id: Utils.getOptionId(1.25),
        value: "1.25",
        text: "1.25"
    },
    {
        id: Utils.getOptionId(1.5),
        value: "1.5",
        text: "1.5"
    },
    {
        id: Utils.getOptionId(2),
        value: "2",
        text: "2"
    }
];

export default {
    DEFAULT_SPEED,
    HOST_NAME,
    OPTIONS,
}
