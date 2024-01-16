import { Link, useLocation } from 'react-router-dom'
import "./BreadCrumbs.css";
import { Page } from '../../models/common';

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
                    key={p.link}
                >
                    {p.title + '/'}
                </Link>
            ))
        }
    </nav>
  );
}

export default Breadcrumbs;
