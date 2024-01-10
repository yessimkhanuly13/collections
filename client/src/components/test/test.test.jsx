import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Test from './test';

test('test', ()=>{
    render(<Test/>)
    screen.debug();
})


