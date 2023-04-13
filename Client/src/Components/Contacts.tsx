import { useState, FC } from "react";
import styled from "styled-components";
import LeftChatComponent from "./LeftChatComponent";
import { useSelector } from "react-redux";
import Logo from "../utils/Assests/logoLiveChat.png";
import { Button, Modal } from "native-base";
import swal from "sweetalert";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "../Services/mutation/chats.mutation";
import { GET_USER_CHATS } from "../Services/Queries/chats.query";
import { toast } from "react-toastify";
import Logout from "./Logout";
import { MdClose, MdOutlineContacts } from "react-icons/md";

interface props {
  data: any;
  userID: string;
  setCurrentChat: (indx: any) => void;
  socket: any;
  setVisible: (val: boolean) => void;
}

const Contacts: FC<props> = ({
  data = { members: [], _id: "" },
  userID,
  setCurrentChat,
  socket,
  setVisible,
}) => {
  // console.log("Member Data", data);

  const { user } = useSelector((state: any) => state.auth);

  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const [allChats, setAllChats] = useState(data);

  const [friendEmail, setFriendEmail] = useState<string>("");

  const [createChat, { loading }] = useMutation(CREATE_CHAT, {
    onCompleted: (res) => {
      console.log(res);
      toast.success("Friend added successfully");

      const receiverId = res?.createChatByEmail?.members?.find(
        (item: any) => item !== userID
      );

      let _data = {
        receiverId,
        chat: {
          _id: res.createChatByEmail._id,
          members: res.createChatByEmail.members,
        },
      };
      setAllChats([...data, _data.chat]);
      socket.current.emit("create-message", _data);
      setModalVisible(false);
    },
    onError: (err) => {
      console.log(err);
    },
    refetchQueries: [
      { query: GET_USER_CHATS, variables: { userId: user._id } },
    ],
  });

  const handleAddUser = () => {
    if (friendEmail.trim() === "") {
      toast.warn("Please enter a email id to continue");
      return;
    }

    createChat({ variables: { email: friendEmail } });
  };

  return (
    <>
      <Container>
        <Modal
          isOpen={modalVisible}
          onClose={setModalVisible}
          size={"lg"}
          _backdrop={{ bg: "black" }}
        >
          <Modal.Content bgColor={"#131324"}>
            <Modal.Body alignItems={"center"}>
              <FormContainer>
                <form action="" onSubmit={() => console.log("first")}>
                  <div className="brand">
                    <img src={Logo} alt="logo" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Email of your friend"
                    name="confirmPassword"
                    onChange={(e) => setFriendEmail(e.target.value)}
                  />
                </form>
              </FormContainer>
              <Button
                size="md"
                variant="subtle"
                colorScheme="purple"
                mt={"4"}
                w={"48"}
                isLoading={loading}
                onPress={() => handleAddUser()}
              >
                Add friend
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <div className="brand">
          <img src={Logo} alt="logo" />

          <Button
            size="md"
            variant="ghost"
            colorScheme={"purple"}
            style={{ marginLeft: "auto", marginRight: 10 }}
            onPress={() => setModalVisible(true)}
          >
            New Chat
          </Button>
          <ButtonContainer
            style={{}}
            onClick={() => {
              console.log("Pressed");
              setVisible(true);
            }}
          >
            <MdClose />
          </ButtonContainer>
          {/* <h3>Live Chat</h3> */}
        </div>
        <div className="contacts">
          {allChats?.map((contact: any, index: any) => {
            const userId = contact?.members?.find(
              (item: any) => item !== userID
            );
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => {
                  setCurrentSelected(index);
                  setCurrentChat(index);
                  setVisible(true);
                }}
              >
                <LeftChatComponent userID={userId} />
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${user.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{user.name}</h2>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contacts;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 2rem;
    }
    h2 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    justify-content: center;
    align-items: center;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 2rem;
      margin-left: 1rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius: 5rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 5rem;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const ButtonContainer = styled.button`
  display: none;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;

  @media screen and (min-width: 100px) and (max-width: 999px) {
    display: flex;
  }

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
