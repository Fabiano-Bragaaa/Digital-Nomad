import { fireEvent, render, screen } from "@testing-library/react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

function Component({ label, loading }: { label: string; loading: boolean }) {
  const [count, setCount] = useState(0);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Pressable testID="increment-button" onPress={() => setCount(prev => prev + 1)}>
        <Text>{label}</Text>
      </Pressable>
      <Text>Pressed:{count}</Text>
      <Text onPress={() => setCount(0)}>reset counter</Text>
    </View>
  );
}

describe("Component", () => {
  it("should display the label when is not loading", () => {
    render(<Component label="test" loading={false} />);
  
    const element = screen.getByText("test");
  
    expect(element).toBeOnTheScreen();
  });

  it("should display the label when is loading", () => {
    render(<Component label="test" loading={true} />);
  
    const element = screen.getByText(/Loading/i);
  
    expect(element).toBeOnTheScreen();
  });

  it("should display the current count number", () => {
    render(<Component label="test" loading={false} />);
  
    const element = screen.getByText(/pressed:0/i);
  
    expect(element).toBeOnTheScreen();


    fireEvent.press(screen.getByTestId("increment-button"))
    expect(screen.getByText(/pressed:1/i)).toBeOnTheScreen();

  });
  
})
