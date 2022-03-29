// This file ensures that jest uses the correct environment variables
// mainly important for wallaby

import path = require('path');
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './.env.local') });
