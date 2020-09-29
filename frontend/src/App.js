import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import {
  AppContainer,
  FlexboxContainer,
  Input,
  Button,
  List,
  ListItem,
  override,
} from "./styles";

const App = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlTags, setHtmlTags] = useState([]);
  const [mostUsedHtmlTag, setMostUsedHtmlTag] = useState("");

  const handleChange = (event) => setUrl(event.target.value);

  const handleClick = (event) => {
    const buttonId = event.target.id;
    setHtmlTags([]);
    setMostUsedHtmlTag("");
    setLoading(true);
    axios
      .post(`http://localhost:5000/${buttonId}`, {
        url,
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHtmlTags(response.data);
          setLoading(false);
        } else {
          setMostUsedHtmlTag(response.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <AppContainer>
      <FlexboxContainer>
        <Input onChange={handleChange} />
      </FlexboxContainer>
      <FlexboxContainer>
        <Button id="unique" onClick={handleClick}>
          All unique tags
        </Button>
        <Button id="commonly" onClick={handleClick}>
          The most commonly used tag
        </Button>
        <Button id="descendent" onClick={handleClick}>
          The longest path starting from root node to the descendent
        </Button>
        <Button id="most" onClick={handleClick}>
          The longest path starting from root node where the most popular tag is
          used the most times
        </Button>
      </FlexboxContainer>
      <FlexboxContainer>
        <List>
          {htmlTags.map((htmlTag, index) => (
            <ListItem key={index}>{htmlTag}</ListItem>
          ))}
        </List>
        {mostUsedHtmlTag}
      </FlexboxContainer>
      <ClipLoader
        css={override}
        size={150}
        color={"#123abc"}
        loading={loading}
      />
    </AppContainer>
  );
};

export default App;
