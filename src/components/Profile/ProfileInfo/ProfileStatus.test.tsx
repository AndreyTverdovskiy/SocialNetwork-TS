import React from "react";
//@ts-ignore
import create from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe('Profile status component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'test status'} updateStatus={() => {}}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('test status')
    })
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status={'test status'} updateStatus={() => {}}/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })
    test('after creation span should be test status', () => {
        const component = create(<ProfileStatus status={'test status'} updateStatus={() => {}}/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('test status')
    })
})