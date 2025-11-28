import { ApolloError } from '@apollo/client';
import { ToastType } from 'react-native-toast-notifications';

export default function getGraphQLErrors(
  error: ApolloError,
  functionName: string,
  toast?: ToastType
) {
  // ! need to fix all errors
  if (error) {
    const message = error.message || 'An unknown error occurred';
    let statusCode;
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      error.graphQLErrors.forEach((gqlError, index) => {
        const statusCodeField = (gqlError.extensions?.exception as any)
          ?.statusCode;
        if (statusCodeField) {
          statusCode = statusCodeField;
        }
        console.log(`GraphQL Error in ${functionName} - ${index + 1}:`, {
          message: gqlError.message,
          locations: gqlError.locations,
          path: gqlError.path,
          extensions: gqlError.extensions,
        });
      });
    }

    if (error.networkError) {
      console.log(`Network Error in ${functionName}:`, {
        message: error.networkError.message,
        statusCode: (error.networkError as any).statusCode,
        result: (error.networkError as any).result,
      });
    }

    if (toast && statusCode && statusCode < 500) {
      toast.show(message, {
        type: 'danger',
      });
    }
  }
}
