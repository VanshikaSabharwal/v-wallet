"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { peerTransfer } from "../app/lib/actions/PeerTransfer";
import toast, { Toaster } from "react-hot-toast";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      // Show loading notification
      toast.loading("Processing your transfer...");

      // Perform the peer transfer
      const response = await peerTransfer(number, Number(amount) * 100);

      // Show success notification
      toast.success("Transfer successful!");
      setMessage(response.message);
    } catch (error) {
      // Show error notification
      toast.error("An error occurred while processing the transfer.");
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <h1>Transfer to your Friend</h1>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => setNumber(value)}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={handleSend}>Send</Button>
            </div>
            {message && (
              <div className="pt-4 text-center">
                <p>{message}</p>
              </div>
            )}
          </div>
        </Card>
      </Center>
      <Toaster />
    </div>
  );
}
