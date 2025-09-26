#!/bin/bash

# Update all domain cards with better transparency and readability
# Replace 0.15 background opacity with 0.6 for better readability
# Replace 0.08 border opacity with 0.3 for stronger definition
# Replace 0.06 shadow opacity with 0.2 for better depth

find components/domains -name "*.tsx" -exec sed -i 's/background: '\''rgba(18, 22, 28, 0\.15)'\''/background: '\''rgba(18, 22, 28, 0.6)'\''/g' {} \;
find components/domains -name "*.tsx" -exec sed -i 's/border: '\''1px solid rgba(212, 175, 55, 0\.08)'\''/border: '\''1px solid rgba(212, 175, 55, 0.3)'\''/g' {} \;
find components/domains -name "*.tsx" -exec sed -i 's/inset 0 1px 0 rgba(212, 175, 55, 0\.06)/inset 0 1px 0 rgba(212, 175, 55, 0.2)/g' {} \;
find components/domains -name "*.tsx" -exec sed -i 's/0 4px 20px rgba(0, 0, 0, 0\.25)/0 4px 20px rgba(0, 0, 0, 0.4)/g' {} \;

# Fix smaller container cards too
find components/domains -name "*.tsx" -exec sed -i 's/background: '\''rgba(212, 175, 55, 0\.04)'\''/background: '\''rgba(212, 175, 55, 0.08)'\''/g' {} \;
find components/domains -name "*.tsx" -exec sed -i 's/border: '\''1px solid rgba(212, 175, 55, 0\.12)'\''/border: '\''1px solid rgba(212, 175, 55, 0.25)'\''/g' {} \;
find components/domains -name "*.tsx" -exec sed -i 's/inset 0 1px 0 rgba(212, 175, 55, 0\.08)/inset 0 1px 0 rgba(212, 175, 55, 0.15)/g' {} \;

echo "Fixed transparency levels for better readability"