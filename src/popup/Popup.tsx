import React, { useState } from 'react';
import Constants  from "../constants";
import { Option } from "../types";
import './popup.css';
import Utils  from '../utils';

interface props {
    option:     Option;
    isChecked:  boolean;
    onChange:   (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Option: React.FC<props> = ({option, isChecked, onChange}) => {
    return (
        <div className="speed_option">
            <input
                type="radio"
                id={option.id}
                name="speed"
                value={option.value}
                checked={isChecked} onChange={onChange}
            />
            <label htmlFor={option.id}>{option.text}</label>
        </div>
    );
}

const Popup: React.FC<{}> = (): null | JSX.Element => {
    const [speed, setSpeed] = useState("0");
    const [isSpeedFetched, changeSpeedFetchStatus] = useState(false);

    const onOptionSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const speed = e.currentTarget.value;
        setSpeed(speed);
        chrome.storage.sync.set({ speed });
        //check if hotstar tab open, how many? change speed in all
        await Utils.changePlayBackSpeed();
    }

    const renderOption = (option: Option, key: number) =>
        <Option key={key} option={option} isChecked={option.value === speed} onChange={onOptionSelect}/>;

    chrome.storage.sync.get("speed", ({ speed }) => {
        setSpeed(speed);
        changeSpeedFetchStatus(true);
    });

    if (!isSpeedFetched) return null;

    return (
        <>
            <h1>HotStar</h1>
            <div className="container">
                <h3>Playback Speed</h3>
                <div className="options">
                    {Constants.OPTIONS.map(renderOption)}
                </div>
            </div>
        </>
    );
}


export default Popup;