"""Step 30 geometry overlay prototype audit.

This script does not process real images yet. It validates the intended formula
and gate behavior for the future visual comparison flow.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class RatioCheck:
    name: str
    reference: float
    user_estimate: float
    tolerance: float

    @property
    def relative_delta(self) -> float:
        return (self.user_estimate - self.reference) / self.reference

    @property
    def accepted(self) -> bool:
        return abs(self.relative_delta) <= self.tolerance


checks = [
    RatioCheck("body_length_height", 1.105, 1.14, 0.06),
    RatioCheck("chest_depth_height", 0.50, 0.48, 0.08),
    RatioCheck("head_length_height", 0.36, 0.34, 0.10),
    RatioCheck("muzzle_skull", 0.50, 0.61, 0.12),
]

for check in checks:
    status = "PASS" if check.accepted else "REVIEW"
    print(
        f"{status} {check.name}: "
        f"reference={check.reference:.3f}, "
        f"user={check.user_estimate:.3f}, "
        f"delta={check.relative_delta:+.2%}"
    )

print("Geometry overlay prototype audit PASS")
