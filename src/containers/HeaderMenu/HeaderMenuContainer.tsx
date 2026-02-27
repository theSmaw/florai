import { useNavigate } from 'react-router-dom';
import { HeaderMenu } from '../../components/HeaderMenu/HeaderMenu';

export function HeaderMenuContainer() {
  const navigate = useNavigate();
  return (
    <HeaderMenu
      onCatalogueClick={() => navigate('/catalogue')}
      onCollectionClick={() => navigate('/collection')}
      onWeddingsClick={() => navigate('/weddings')}
    />
  );
}
