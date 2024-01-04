import React from "react";
import Link from "next/link";
type ShowMobileType = {
  showMobile: Boolean;
  onClickHide: () => void;
};
const MobileNavBar: React.FC<ShowMobileType> = ({
  showMobile,
  onClickHide,
}) => {
  return (
    <>
      {showMobile && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 text-center">
            <Link
              href="/"
              onClick={onClickHide}
              className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Home page
            </Link>

            <Link
              onClick={onClickHide}
              href="/questions"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Questions
            </Link>
            <Link
              onClick={onClickHide}
              href="/answers"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Answers
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavBar;
