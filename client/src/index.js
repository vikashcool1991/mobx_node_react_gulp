import React from 'react';
import {ReactDOM} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import App from './App';
import { util } from 'react-lightning-design-system';
import path from 'path';
util.setAssetRoot(path.join(location.pathname, 'assets'));

getRoutes(App)
