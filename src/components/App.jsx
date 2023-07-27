import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { Dna } from 'react-loader-spinner';

import React, { useEffect, useState } from 'react';

import css from './App.module.css';
import Modal from './Modal';

const INITIAL_STATE = {
  searchInput: '',
  largeImageURI: '',
  imageGallery: [],
  totalHits: 0,
  isLoading: false,
  isModalOpen: false,
  isLoadMoreButtonEnabled: false,
  page: 1,
  perPage: 12,
};

export const App = () => {
  const [searchInput, setSearchInput] = useState(INITIAL_STATE.searchInput);
  const [largeImageURI, setLargeImageURI] = useState(
    INITIAL_STATE.largeImageURI
  );
  const [imageGallery, setImageGallery] = useState(INITIAL_STATE.imageGallery);
  const [totalHits, setTotalHits] = useState(INITIAL_STATE.totalHits);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [isModalOpen, setIsModalOpen] = useState(INITIAL_STATE.isModalOpen);
  const [isLoadMoreButtonEnabled, setIsLoadMoreButtonEnabled] = useState(
    INITIAL_STATE.isLoadMoreButtonEnabled
  );
  const [page, setPage] = useState(INITIAL_STATE.page);
  const [perPage, setPerPage] = useState(INITIAL_STATE.perPage);

  const updateSearchInput = query => {
    if (query !== searchInput) {
      setSearchInput(query);
    }
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectLargeImage = uri => {
    setLargeImageURI(uri);
    setIsModalOpen(true);
  };

  const fetchImages = async addToExistingState => {
    try {
      console.log({
        page: page,
        searchInput: searchInput,
      });
      setIsLoading(true); //Ważne jest, aby przy każdym "nowym" wyszukiwaniu wyresetować wartości
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchInput}&page=${page}&key=36881053-d0d1537e2fca48fbbc934d91b&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      const json = await response.json();

      setTotalHits(json.totalHits);
      if (addToExistingState) {
        setImageGallery([...imageGallery, ...json.hits]);
      } else {
        setImageGallery(json.hits);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Możemy w opcjonalnym bloku finally umieścić instrukcje, które mają zawsze się wykonać, niezależnie od tego, czy wyjątek zostanie złapany, czy nie.
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page !== 1) {
      fetchImages(true);
    }
  }, [page]);

  useEffect(() => {
    if (searchInput.length > 0) {
      fetchImages(false);
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setSearchInput(INITIAL_STATE.searchInput);
      setLargeImageURI(INITIAL_STATE.largeImageURI);
      setImageGallery(INITIAL_STATE.imageGallery);
      setTotalHits(INITIAL_STATE.totalHits);
      setIsLoading(INITIAL_STATE.isLoading);
      setIsModalOpen(INITIAL_STATE.isModalOpen);
      setIsLoadMoreButtonEnabled(INITIAL_STATE.isLoadMoreButtonEnabled);
      setPage(INITIAL_STATE.page);
      setPerPage(INITIAL_STATE.perPage);
    }
  }, [searchInput]);

  useEffect(() => {
    const canLoadMore = totalHits > page * perPage && !isLoading;
    // Porównujemy obecną wartość z poprzednią wartością, aby nie aktualizować
    // stanu niepotrzebnie - w tej metodzie stworzyłoby to
    // "nieskończony" ciąg wywołań (pętlę) - co zawiesi przeglądarkę
    if (isLoadMoreButtonEnabled !== canLoadMore) {
      setIsLoadMoreButtonEnabled(canLoadMore);
    }
  }, [totalHits, page, perPage, isLoading]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={updateSearchInput} />
      <ImageGallery images={imageGallery} onEnlargeImage={selectLargeImage} />
      <div className={css.buttonLoaderWrapper}>
        <Dna
          visible={isLoading}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        {isLoadMoreButtonEnabled && <Button onClick={incrementPage} />}
      </div>
      {isModalOpen && <Modal image={largeImageURI} onClose={closeModal} />}
    </div>
  );
};
export default App;
