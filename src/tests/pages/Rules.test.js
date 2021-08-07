import React from "react";
import { shallow } from "enzyme";
import { Rules } from "../../pages/Rules";

describe("Test in <Rules />", () => {
  const wrapper = shallow(<Rules />);
  const h1 = wrapper.find("h1");
  test("should display the component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should show an h1 with the text "Rules"', () => {
    expect(h1.text().trim()).toBe("Rules");
  });
  test("should show an h1 with class text-white", () => {
    expect(h1.prop("className")).toContain("text-white");
  });
});
