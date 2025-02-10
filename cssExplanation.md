
## Explanation of Extra Effects and Animations:

1. **Background Gradient (body)**

   - Used `linear-gradient(135deg, #e9a8fc, #7c52a5);` to give a stylish background.
   - This makes the UI visually appealing with a soft gradient effect.

2. **Flexbox Centering (body and .main)**
   - `display: flex; justify-content: center; align-items: center;`
   - Ensures the quiz box stays centered vertically and horizontally.

3. **Box Animations (#box)**
   - `animation: fadeIn 1s ease-out, slideIn 1.2s ease-out;`
   - `fadeIn`: Fades in the box smoothly when the page loads.
   - `slideIn`: Moves the box slightly from above into position, making it look more natural.

4. **Button Hover Effects (`.btn:hover`)**
   - `transform: scale(1.05);`
   - Slightly enlarges the button when hovered, giving a modern feel.
   - `box-shadow` adds a glow effect when hovering.

5. **Button Click Ripple Effect (`.btn:active::after`)**
   - When clicked, a ripple effect expands outward.
   - `animation: ripple 0.5s ease-out;` makes the effect smooth.

6. **Smooth Transitions**
   - `transition: all 0.3s ease-in-out;` ensures animations feel natural.

7. **Responsive Design**
   - `@media (max-width: 768px)` makes sure the layout adjusts well on smaller screens.

This CSS creates a modern, visually appealing, and interactive quiz interface!
*/