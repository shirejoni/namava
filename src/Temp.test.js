import React from "react";
import {render} from '@testing-library/react';
import Temp from './Temp';

test("should render hello world message", () => {
    let {getByText} = render(<Temp/>);
    const helloWorldElement = getByText(/hello world/i);
    expect(helloWorldElement).toBeInTheDocument();
})
