import profileReducer, {addPost, deletePost, profilePageType, profileType} from "./profile-reducer";
import {v1} from "uuid";

let state: profilePageType = {
    posts: [
        {id: v1(), message: 'Hi, how are you?', counts: 5},
        {id: v1(), message: 'It is my first post', counts: 8}
    ],
    profile: {} as profileType,
    status: ''
}

test('length of post should be increment', () => {
    //Test data
    let action = addPost('It');

    //Actions
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(3);
});

test('message of post should be correct', () => {
    //Test data
    let action = addPost('It');

    //Actions
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts[2].message).toBe('It');
});

test('after deleting length of post should be decrement', () => {
    //Test data
    let action = deletePost('e83b6440-bd81-11ec-bdb1-034d043f8856');

    //Actions
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(2);
});

