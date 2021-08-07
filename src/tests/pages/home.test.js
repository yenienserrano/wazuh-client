import React from "react";
import { shallow } from "enzyme";
import { Home } from "../../pages/Home";

describe("Test in <Home />", () => {
  test("should display the component correctly", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
