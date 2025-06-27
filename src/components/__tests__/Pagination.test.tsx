import { render, screen, fireEvent } from '@testing-library/react';
import {Pagination} from '@/components';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  const setup = (currentPage: number, totalPages: number = 5) => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
    return { onPageChange };
  };

  it('renders page number correctly', () => {
    setup(1, 4);
    expect(screen.getByText(/page/i)).toHaveTextContent('Page 2 of 4');
  });

  it('disables "Previous" on first page', () => {
    setup(0, 3);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
  });

  it('disables "Next" on last page', () => {
    setup(4, 5);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled();
  });

  it('calls onPageChange with correct values', () => {
    const { onPageChange } = setup(2, 5);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('has appropriate accessibility attributes', () => {
    setup(1, 3);

    const nav = screen.getByRole('navigation', { name: /pagination navigation/i });
    expect(nav).toBeInTheDocument();

    const liveRegion = screen.getByText(/page/i);
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });
});
