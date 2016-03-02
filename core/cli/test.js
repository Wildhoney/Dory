import { exec } from 'shelljs';
import test from 'ava';

exec('ava tests/*.test.js');
