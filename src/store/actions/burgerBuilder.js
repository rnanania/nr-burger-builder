import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingName: ingName
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
}