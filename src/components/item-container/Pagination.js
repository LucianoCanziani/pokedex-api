import { useEffect, useState } from "react";
import { Howl } from "howler";
import { ToastContainer, toast } from 'react-toastify';
import SoundSrc from "../../assets/sounds/select.mp3";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
  pokemonFilter,
}) => {
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pageNumberLimit = 5;
  let pageNumbers = [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promesa = new Promise((res, rej) => {
      setTimeout(() => {
        res(Pagination);
      }, 1500);
    });
    promesa
      .catch((rej) => {
        toast.error("There was an error in loading the Pagination");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setMinPageNumberLimit(0);
    setMaxPageNumberLimit(5);
  }, [totalPosts]);

  if (pokemonFilter.length >= 1) {
    for (let i = 1; i <= Math.ceil(pokemonFilter.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const prevButton = (e) => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
    if (currentPage - 1 === minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    callMySound(SoundSrc);
  };

  const nextButton = (e) => {
    setCurrentPage((next) => (next === pageNumbers.length ? next : next + 1));
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    callMySound(SoundSrc);
  };

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  return (
    <>
      {loading ? null : (
        <nav className="pagination-nav">
          <button
            className={`btn-pag ${currentPage === 1 ? "disabled" : ""}`}
            onClick={prevButton}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <ul className="pagination">
            {pageNumbers.map(
              (number) =>
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit && (
                  <li
                    key={number}
                    onClick={() => paginate(number)}
                    className={`numbers ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </li>
                )
            )}
          </ul>
          <button
            className={`btn-pag ${
              currentPage === pageNumbers.length ? "disabled" : ""
            }`}
            onClick={nextButton}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
};

export default Pagination;
