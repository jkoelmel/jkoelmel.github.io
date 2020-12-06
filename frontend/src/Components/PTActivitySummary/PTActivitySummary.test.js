import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ActivitySummary} from '../PTActivitySummary/PTActivitySummary';
import {List} from '@material-ui/core';
import {fetchPTsPatients, setSelectedPatient} from "../../Redux/actions/actions-pt";

configure({adapter: new Adapter()});

describe('<ActivitySummary/>',() => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ActivitySummary pt_id={()=>{}}  patient_id={()=>{}} pt={[]} selectedPatient={[]} />)
    });
    it('should render one list of PT Activity Summary',()=> {
        wrapper.setProps({pt_id: 1,patient_id: 1,pt:[1], selectedPatient: [1]})
        expect(wrapper.find(List)).toHaveLength(5)
    })
    // it('should render one list of PT Activity Summary',()=> {
    //     wrapper.setProps({pt_id: 1,patient_id: 1,pt:[1], selectedPatient: [1]})
    //     expect(wrapper.find(showButton)).toHaveLength(5)
    // })
    
})
