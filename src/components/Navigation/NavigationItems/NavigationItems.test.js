import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('Should render two <NavigationItem /> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('Should render four <NavigationItem /> including Logout if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toBeTruthy();
    })
});