import  { useEffect, useState, useContext } from "react";
import { GalleryContext } from "../../helpers/GalleryContext";
import { CatContext } from "../../helpers/CatContext";
import styled from "styled-components";
import axios from "axios";
import HandleVote from "../../helpers/HandleVote";
import Search from "components/Searchbar/Search";
import Wrapper from "../../components/Shared/Wrapper";
import GoBack from "../../components/Shared/GoBack";
import GallerySort from "./GallerySort";
import UploadModal from "./UploadModal";
import Loader from "../../components/Shared/Loader";

import {
  Masonry,
  Pattern,
  Img,
  Label,
  GridItemWithLike,
} from "../../components/Shared/Masonry";

const Gallery = () => {
  const { favKey } = useContext(CatContext);
  const [favorites] = favKey;
  const {
    catsKey,
    chunkedKey,
    orderKey,
    typeKey,
    currBreedKey,
    limitKey,
  } = useContext(GalleryContext);
  const [cats, setCats] = catsKey;
  const [chunked, setChunked] = chunkedKey;
  const [order] = orderKey;
  const [type] = typeKey;
  const [currBreed] = currBreedKey;
  const [limit] = limitKey;

  const [uploadOpen, setUploadOpen] = useState(false);
  const [loading, setLoading] = useState();
  const { favFromGallery } = HandleVote();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios(
        "https://api.thedogapi.com/v1/images/search?limit=5"
      );
      setCats(response.data);
      setLoading(false);
    };
    setTimeout(() => fetchData(), 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reloading with filters
  const handleReload = () => {
    const breedID = currBreed.id;
    setLoading(true);
    const fetchData = async () => {
      const response = await axios(
        `https://api.thedogapi.com/v1/images/search?limit=${limit}&order=${order}&mime_types=${type}&breed_id=${
          breedID ? breedID : ""
        }`
      );
      setCats(response.data);
      setLoading(false);
    };
    setTimeout(() => fetchData(), 1000);
  };


  useEffect(() => {
    if (cats.length > 0) {
      setLoading(true);
      const temporary = [...cats];
      const result = [];
      while (temporary.length > 0) {
        result.push(temporary.splice(0, 10));
      }
      setChunked(result);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cats]);

  return (
    <>
      <Search isOpen={isOpen} setIsOpen={setIsOpen} />
      <Wrapper>
        <Container>
          <GoBack btnContent="Gallery" />
          <Upload onClick={() => setUploadOpen(true)}>
            <svg viewBox="0 0 16 16">
              <path d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z"></path>
            </svg>
            Upload
          </Upload>
        </Container>

        <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
        <GallerySort handleReload={handleReload} />
        {loading ? (
          <Loader />
        ) : (
          <Masonry uploadOpen={uploadOpen}>
            {chunked.map((tenCats, index) => (
              <Pattern key={index}>
                {tenCats
                  .sort((a, b) =>
                    a.width / a.height > b.width / b.height ? 1 : -1
                  )
                  .map((cat, index) => (
                    <GridItemWithLike
                      width={cat.width}
                      height={cat.height}
                      key={cat.id}
                      index={index}
                    >
                      <Img key={cat.id} src={cat.url} />
                      <Label onClick={() => favFromGallery(cat)}>
                        {favorites.indexOf(cat) === -1 ? (
                          <svg viewBox="0 0 30 30">
                            <path d="M8.07107 2C4.71811 2 2 4.71811 2 8.07107C2 9.68122 2.63963 11.2254 3.77817 12.364L15 23.5858L26.2218 12.364C27.3604 11.2254 28 9.68121 28 8.07107C28 4.71811 25.2819 2 21.9289 2C20.3188 2 18.7746 2.63963 17.636 3.77817L15.7071 5.70711C15.3166 6.09763 14.6834 6.09763 14.2929 5.70711L12.364 3.77818C11.2254 2.63963 9.68121 2 8.07107 2ZM0 8.07107C0 3.61354 3.61354 0 8.07107 0C10.2116 0 12.2646 0.850343 13.7782 2.36396L15 3.58579L16.2218 2.36396C17.7354 0.850341 19.7884 0 21.9289 0C26.3865 0 30 3.61354 30 8.07107C30 10.2116 29.1497 12.2646 27.636 13.7782L15.7071 25.7071C15.3166 26.0976 14.6834 26.0976 14.2929 25.7071L2.36396 13.7782C0.850339 12.2646 0 10.2116 0 8.07107Z"></path>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 30 30">
                            <path d="M8.07107 2C3.61354 2 0 5.61354 0 10.0711C0 12.2116 0.850339 14.2646 2.36396 15.7782L14.2929 27.7071C14.6834 28.0976 15.3166 28.0976 15.7071 27.7071L27.636 15.7782C29.1497 14.2646 30 12.2116 30 10.0711C30 5.61354 26.3865 2 21.9289 2C19.7884 2 17.7354 2.85034 16.2218 4.36396L15 5.58579L13.7782 4.36396C12.2646 2.85034 10.2116 2 8.07107 2Z"></path>
                          </svg>
                        )}
                      </Label>
                    </GridItemWithLike>
                  ))}
              </Pattern>
            ))}
          </Masonry>
        )}
      </Wrapper>
    </>
  );
};

export default Gallery;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Upload = styled.button`
  border-radius: 10px;
  border: none;
  height: 40px;
  background: ${(props) => props.theme.pinkBtn};
  color: #ff868e;
  min-width: 143px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &:hover {
    background: #ff868e;
    color: #ffffff;
  }

  svg {
    fill: #ff868e;
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }

  &:hover svg {
    fill: #ffffff;
  }
`;