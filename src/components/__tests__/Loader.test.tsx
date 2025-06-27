import { render, screen } from '@testing-library/react';
import {Loader} from '@/components';
import '@testing-library/jest-dom';

describe('Loader', () => {
  it('renders with role="status" and aria-live="polite"', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-live', 'polite');
  });

  it('contains a spinning icon and loading text', () => {
    render(<Loader />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const icon = screen.getByTestId('loader-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('animate-spin');
  });
});
