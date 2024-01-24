import { Link, useLocation } from 'react-router-dom'
import "./BreadCrumbs.css";
import { Page } from '../../models/common';

interface BreadcrumbsProps {
    pages: Page[]
}

const Breadcrumbs = ({ pages }: BreadcrumbsProps) => {
  const location = useLocation();

  return (
      <nav style={{marginBottom: '2%'}} className="breadcrumbs">
          {
            pages.map((p: Page, indx) => (
                <Link to={p.link}
                    className={location.pathname === p.link ? "breadcrumb-active" : "breadcrumb-not-active"}
                    key={p.link}
                >
                    { (indx !== 0 ? ' > ' : '') + p.title + ' '}
                </Link>
            ))
        }
      </nav>
  );
}

export default Breadcrumbs;
