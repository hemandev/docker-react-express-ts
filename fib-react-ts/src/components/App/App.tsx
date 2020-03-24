import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import { reducer } from '../../store/reducers';
import { setValues, changeStatus } from '../../store/actions';
import { Home } from '../Home/Home';
import { OtherPage } from '../OtherPage/OtherPage';
import { AppState, STATUS_ACTIVE, ValueState } from '../../store/types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const initialState: AppState = {
    currentIndex: undefined,
    indices: [],
    indexValues: [],
    status: STATUS_ACTIVE
};

const shapeData = (data: { [index: string]: string }): ValueState => {
    const indexValues = Object.keys(data).map(key => {
        return { index: key, value: data[key] };
    });
    return {
        indices: Object.keys(data).map(key => parseInt(key)),
        indexValues
    };
};

export const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log('state is', state);

    useEffect(() => {
        axios.get('/api/values/current').then(({ data }) => {
            console.log('data', shapeData(data));
            dispatch(setValues(shapeData(data)));
        });
    }, []);

    useEffect(() => {
        console.log('Inside status effect');
        axios
            .post('/api/values', {
                index: state.currentIndex
            })
            .then(res => {
                if (res.data.success === true) {
                    axios.get('/api/values/current').then(({ data }) => {
                        dispatch(setValues(shapeData(data)));
                    });
                }
            })
            .catch(err => {
                throw err;
            })
            .finally(() => {
                dispatch(changeStatus(STATUS_ACTIVE));
            });
    }, [state.status]);

    return (
        <Router>
            <div className={styles.App}>
                <header className={styles.AppHeader}>
                    <h2 className={styles.AppH2}> Fibo Calculator </h2>
                    <div className={styles.AppNav}>
                        <Link to="/">Home</Link>
                        <Link to="/otherpage">OtherPage</Link>
                    </div>
                </header>
            </div>
            <div>
                <Home {...state} dispatch={dispatch} />
                <Route path="/otherpage" component={OtherPage} />
            </div>
        </Router>
    );
};
