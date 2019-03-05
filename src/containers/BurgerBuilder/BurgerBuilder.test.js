import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { burgerBuilder as BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => { }} />);
    });

    it('Should render <BuildControls /> when receive ingredients', () => {
        wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});