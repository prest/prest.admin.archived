import React from 'react';
import ErrorPage from '~/components/PageError';
import BackgroundParticles from '~/components/BackgroundParticles';

export const pageNotFound = (): React.ReactElement => {
  return (
    <>
      <ErrorPage
        code="404"
        message="page not found"
        description="We are sorry but the page are looking for does not exist."
      />
      <BackgroundParticles />
    </>
  );
};

export default pageNotFound;
