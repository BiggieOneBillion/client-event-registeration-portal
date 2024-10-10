import InputContainer from "./InputContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCallOutline, IoPersonCircleOutline } from "react-icons/io5";
import { MdEditNote, MdOutlineMyLocation } from "react-icons/md";
import {
  Button,
  FormControl,
  FormHelperText,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import { useParams } from "react-router-dom";

interface formData {
  eventId: string;
  name: string;
  email: string;
  location: string;
  phoneNumber: string;
}

type PropsType = {
  eventName: string;
};

const EventRegistration: React.FC<PropsType> = ({ eventName }) => {
  const { id } = useParams();

  const decodedString = atob(id as string);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formData>();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit: SubmitHandler<formData> = async (data) => {
    setIsLoading(true);

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:3000/users-customers/create",
        { ...data, eventId: decodedString },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast({
          position: "top",
          status: "success",
          title: "Operation Successful",
          description: "Registration successful",
          duration: 2000,
        });
        setIsLoading(false);
        reset();
        setTimeout(() => {
          onOpen();
        }, 1000);
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error?.response?.data.message === "Unauthorized") {
          toast({
            position: "top",
            status: "error",
            title: "UnAuthorized! Please log-In",
            description: error?.response?.data.message,
            duration: 3000,
          });
          return;
        }
        toast({
          position: "top",
          status: "error",
          title: "Registeration Unsuccessful",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Registeration Unsuccessful",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Registeration Unsuccessful",
          description: "Our Fault, Please try again later ",
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-4 md:space-y-10">
      <div className="space-y-2 md:space-y-0">
        <h1 className="text-xl leading-tight md:leading-normal font-semibold md:text-2xl md:font-medium text-black/80">
          {eventName} - Event Registeration Form
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Fill out the form to register for the {eventName} - event
        </p>
      </div>
      <form
        className="space-y-6 p-2 lg:p-10 lg:w-[700px] rounded-md border focus-within:outline-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <FormControl>
          <InputContainer
            register={register}
            type="text"
            icon={<IoPersonCircleOutline />}
            inputname="name"
            placeholder="Enter your name"
            error={errors.name}
          />
          <FormHelperText>
            Your fullname, in this order firstname and lastname.
          </FormHelperText>
        </FormControl>
        {/* Description */}
        <FormControl>
          <InputContainer
            register={register}
            type="email"
            icon={<MdEditNote />}
            inputname="email"
            placeholder="Enter your email"
            error={errors.email}
          />
          <FormHelperText>
            Email you would like to receive your access code?
          </FormHelperText>
        </FormControl>
        {/* Location */}
        <FormControl>
          <InputContainer
            register={register}
            type="text"
            icon={<MdOutlineMyLocation />}
            inputname="location"
            placeholder="Enter your event location"
            error={errors.location}
          />
          <FormHelperText>
            This is the location you are registering from. This helps us know
            where our customers are coming from.
          </FormHelperText>
        </FormControl>
        {/* phone number */}
        <FormControl>
          <InputContainer
            register={register}
            type="tel"
            icon={<IoCallOutline />}
            inputname="phoneNumber"
            placeholder="Enter your phone number"
            error={errors.phoneNumber}
          />
          <FormHelperText>Your contact phone number</FormHelperText>
        </FormControl>
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            isLoading={isLoading}
            loadingText="Processing"
            // variant={"authSolid"}
            type="submit"
            padding={"0 60px"}
          >
            Submit
          </Button>
        </div>
      </form>
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
};

export default EventRegistration;
