import React from 'react';
import PageError from '~/components/PageError';
import BackgroundParticles from '~/components/BackgroundParticles';

export const PageNotFound = (): React.ReactElement => (
  <>
    <PageError
      code="404"
      message="page not found"
      description="We are sorry but the page are looking for does not exist."
    />
    <BackgroundParticles />
  </>
);

export default PageNotFound;
