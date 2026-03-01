/**
 * FlowerDetail view — route target for /catalogue/:flowerId.
 * Views are always the router entry point; containers are their children.
 */
import { FlowerDetailContainer } from '../../containers/FlowerDetail/FlowerDetailContainer';

export function FlowerDetailView() {
  return (
    <div data-cy="flower-detail-view">
      <FlowerDetailContainer />
    </div>
  );
}
