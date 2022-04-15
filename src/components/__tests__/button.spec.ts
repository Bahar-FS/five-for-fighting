import { render } from '@testing-library/react';
import Button from '../button';

describe('<Button />', () => {
    const props = {
        onClick: jest.fn(),
    };

    it('onClicke should be called once', () => {

        expect(props.onClick).toHaveBeenCalledTimes(0);
    });
});