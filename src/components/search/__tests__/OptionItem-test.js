import React from 'react';
import {render} from '@testing-library/react';
import OptionItem from "../OptionItem";


test("should render option caption props", () => {
    let fakeOption = {
        caption: "option 01",
    }
    let {getByText} = render(<OptionItem option={fakeOption}/>);
    const optionCaptionElement = getByText("option 01");
    expect(optionCaptionElement).toBeInTheDocument();
});


test("should render checkbox for type checkbox", () => {
    let fakeOption = {
        caption: "option 01",
        selected: false
    }
    let {getByTestId, rerender} = render(<OptionItem option={fakeOption} type="checkbox"/>);
    expect(getByTestId("checkbox-unchecked")).toBeTruthy();
    fakeOption['selected'] = true;
    rerender(<OptionItem option={fakeOption} type="checkbox"/>);
    expect(getByTestId("checkbox-checked")).toBeTruthy();


})

test("should render checkbox for default", () => {
    let fakeOption = {
        caption: "option 01",
        selected: false
    }
    let {getByTestId, rerender} = render(<OptionItem option={fakeOption}/>);
    expect(getByTestId("checkbox-unchecked")).toBeTruthy();
    fakeOption['selected'] = true;
    rerender(<OptionItem option={fakeOption}/>);
    expect(getByTestId("checkbox-checked")).toBeTruthy();
});
