import { Link, useLocation } from 'react-router-dom'
import "./BreadCrumbs.css";
import { Page } from '../../models/models';

interface BreadcrumbsProps {
    pages: Page[]
}

const Breadcrumbs = ({ pages }: BreadcrumbsProps) => {
  const location = useLocation();

  return (
    <nav>
        {
            pages.map((p: Page) => (
                <Link to={p.link}
                    className={location.pathname === p.link ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    {p.title + '/'}
                </Link>
            ))
        }
    </nav>
  );
}

export default Breadcrumbs;
