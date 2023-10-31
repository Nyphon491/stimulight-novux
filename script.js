document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", async function () {
        try {
            // Request Bluetooth device
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: [0x4fafc201, 0x1fb5, 0x459e, 0x8fcc, 0xc5c9c331914b] }]
            });

            // Connect to the GATT server on the device
            const server = await device.gatt.connect();

            // Get the service you defined on the ESP32
            const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');

            // Get the characteristic for sending data
            const characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');

            // Send the message to the ESP32
            const message = new TextEncoder().encode("Hello");
            await characteristic.writeValue(message);

            console.log("Message sent to ESP32: Hello");
        } catch (error) {
            console.error("Error: " + error);
        }
    });
});
