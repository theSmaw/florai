/**
 * Catalogue view — route target.
 * Views are always the router entry point; containers are their children, never the reverse.
 */
import { CatalogueContainer } from '../../containers/Catalogue/CatalogueContainer';

export function CatalogueView() {
  return <CatalogueContainer />;
}
