import { ErrorSection } from '@/shared/ui/ErrorSection';
import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { ErrorBoundary } from '@suspensive/react';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <EnhancedToastProvider>
        <QueryErrorResetBoundary>
          {({ reset }) => <ErrorBoundary fallback={<ErrorSection onRetry={reset} />}>{children}</ErrorBoundary>}
        </QueryErrorResetBoundary>
      </EnhancedToastProvider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
